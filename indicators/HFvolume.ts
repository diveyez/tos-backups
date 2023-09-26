# Define the inputs
input lookBackPeriod = 20;
input deviationFactor = 2.0;

# Calculate the average volume over the look back period
def avgVolume = Average(volume, lookBackPeriod);

# Calculate the standard deviation of volume over the look back period
def stDevVolume = StDev(volume, lookBackPeriod);

# Calculate the upper and lower bounds for HFT activity
def upperBound = avgVolume + (deviationFactor * stDevVolume);
def lowerBound = avgVolume - (deviationFactor * stDevVolume);

# Determine whether the current volume is within the HFT range
def hftVolume = if volume >= upperBound then volume else Double.NaN;

# Plot the HFT volume and average volume
plot AverageVolume = avgVolume;

# Display the HFT volume in a text box
AddLabel(yes, "HFT Volume: " + Round(hftVolume, 0), Color.CYAN);
